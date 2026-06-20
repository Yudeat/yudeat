import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  LinearFilter,
  SRGBColorSpace,
} from "three";
import {
  imageDistortFragmentShader,
  imageDistortVertexShader,
} from "@/lib/shaders/image-distort";

const PLANE_SEGMENTS = 36;
const MAX_IMAGES = 16;
const SELECTOR = "[data-webgl-image]";

type ImagePlane = {
  root: HTMLElement;
  image: HTMLImageElement;
  mesh: Mesh<PlaneGeometry, ShaderMaterial>;
  texture: Texture;
};

export type WebGLImageEngineOptions = {
  canvas: HTMLCanvasElement;
  amplitude?: number;
  enabled?: boolean;
};

function resolveImageElement(root: HTMLElement): HTMLImageElement | null {
  if (root instanceof HTMLImageElement) return root;
  return root.querySelector("img");
}

export class WebGLImageEngine {
  private readonly renderer: WebGLRenderer;
  private readonly scene: Scene;
  private readonly camera: OrthographicCamera;
  private readonly planes = new Map<HTMLElement, ImagePlane>();
  private readonly amplitude: number;
  private enabled: boolean;
  private width = 0;
  private height = 0;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor({ canvas, amplitude = 0.22, enabled = true }: WebGLImageEngineOptions) {
    this.amplitude = amplitude;
    this.enabled = enabled;

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new Scene();
    this.camera = new OrthographicCamera(0, 0, 0, 0, -100, 100);
    this.camera.position.z = 10;

    this.resize();
    this.scanImages();
    this.bindObservers();
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.planes.clear();
    }
  }

  resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.camera.left = -this.width / 2;
    this.camera.right = this.width / 2;
    this.camera.top = this.height / 2;
    this.camera.bottom = -this.height / 2;
    this.camera.updateProjectionMatrix();
  }

  scanImages(): void {
    const roots = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    ).slice(0, MAX_IMAGES);

    const seen = new Set<HTMLElement>();

    for (const root of roots) {
      const image = resolveImageElement(root);
      if (!image || !image.src) continue;

      seen.add(root);

      if (this.planes.has(root)) {
        this.syncPlane(root);
        continue;
      }

      const texture = new Texture(image);
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;

      const onImageReady = () => {
        texture.needsUpdate = true;
        this.syncPlane(root);
      };

      if (image.complete) {
        onImageReady();
      } else {
        image.addEventListener("load", onImageReady, { once: true });
      }

      const material = new ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uVelocity: { value: 0 },
          uAmplitude: { value: this.amplitude },
          uOpacity: { value: 1 },
        },
        vertexShader: imageDistortVertexShader,
        fragmentShader: imageDistortFragmentShader,
        transparent: true,
        depthWrite: false,
      });

      const geometry = new PlaneGeometry(1, 1, PLANE_SEGMENTS, PLANE_SEGMENTS);
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);

      this.planes.set(root, { root, image, mesh, texture });
      this.syncPlane(root);
    }

    for (const [root, plane] of this.planes) {
      if (seen.has(root)) continue;
      this.scene.remove(plane.mesh);
      plane.mesh.geometry.dispose();
      plane.mesh.material.dispose();
      plane.texture.dispose();
      this.planes.delete(root);
    }
  }

  update(velocity: number, time: number): void {
    if (!this.enabled) return;

    this.planes.forEach((_, root) => this.syncPlane(root));

    this.planes.forEach(({ mesh }) => {
      mesh.material.uniforms.uTime.value = time;
      mesh.material.uniforms.uVelocity.value = velocity;
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();

    for (const plane of this.planes.values()) {
      this.scene.remove(plane.mesh);
      plane.mesh.geometry.dispose();
      plane.mesh.material.dispose();
      plane.texture.dispose();
    }

    this.planes.clear();
    this.renderer.dispose();
  }

  private syncPlane(root: HTMLElement): void {
    const plane = this.planes.get(root);
    if (!plane) return;

    const rect = root.getBoundingClientRect();
    const style = window.getComputedStyle(root);
    if (
      rect.width < 2 ||
      rect.height < 2 ||
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number(style.opacity) < 0.02
    ) {
      plane.mesh.visible = false;
      return;
    }

    const isDrawable =
      plane.image.complete &&
      plane.image.naturalWidth > 0 &&
      rect.width >= 2 &&
      rect.height >= 2;

    plane.mesh.visible = isDrawable;
    if (!isDrawable) return;

    const centerX = rect.left + rect.width / 2 - this.width / 2;
    const centerY = -(rect.top + rect.height / 2 - this.height / 2);
    plane.mesh.position.set(centerX, centerY, 0);
    plane.mesh.scale.set(rect.width, rect.height, 1);
    plane.texture.needsUpdate = true;
  }

  private bindObservers(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.scanImages();
    });
    this.resizeObserver.observe(document.documentElement);

    this.mutationObserver = new MutationObserver(() => {
      this.scanImages();
    });
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-webgl-image", "src", "style"],
    });
  }
}
