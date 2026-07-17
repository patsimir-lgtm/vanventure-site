from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets"
OUT.mkdir(exist_ok=True)


def cover_plate(img, box):
    patch = img.crop(box)
    patch = patch.resize((max(1, patch.width // 12), max(1, patch.height // 12)))
    patch = patch.resize((box[2] - box[0], box[3] - box[1]))
    patch = patch.filter(ImageFilter.GaussianBlur(radius=8))
    patch = ImageEnhance.Contrast(patch).enhance(0.55)
    patch = ImageEnhance.Brightness(patch).enhance(0.62)
    img.paste(patch, box)


def save_jpeg(src_name, dst_name, boxes=(), quality=86):
    img = Image.open(ROOT / src_name).convert("RGB")
    for box in boxes:
        cover_plate(img, box)
    img.save(OUT / dst_name, quality=quality, optimize=True, progressive=True)


def save_png_as_jpeg(src_name, dst_name, boxes=(), quality=88):
    img = Image.open(ROOT / src_name).convert("RGB")
    for box in boxes:
        cover_plate(img, box)
    img.save(OUT / dst_name, quality=quality, optimize=True, progressive=True)


save_jpeg(
    "image0.jpeg",
    "van-side-gear-carrier-anonymized.jpg",
    boxes=[(20, 139, 108, 158)],
)
save_jpeg(
    "image2.jpeg",
    "two-vans-workshop-yard-anonymized.jpg",
    boxes=[(86, 149, 138, 164), (214, 158, 269, 173)],
)
save_png_as_jpeg(
    "image0.png",
    "vw-gear-carrier-trail-anonymized.jpg",
    boxes=[(258, 384, 360, 426)],
)
save_jpeg(
    "image1.jpeg",
    "van-on-lift.jpg",
)
save_jpeg(
    "Trip Alpes 112024-01.jpg",
    "skep-detail-alps.jpg",
)
save_jpeg(
    "Trip Alpes 112024-04.jpg",
    "skep-van-alps.jpg",
)
