"""Build the resume PDF.  Usage:  python3 scripts/cv/build.py [output.pdf]
Needs: pip install playwright  (+ a Chromium).  Or just open cv.html in Chrome →
Print → Save as PDF (A4, margins: None, Background graphics: ON)."""
import sys, pathlib
from playwright.sync_api import sync_playwright

here = pathlib.Path(__file__).resolve().parent
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here.parent.parent / "public" / "Abhijeet_Kumar_CV.pdf"
qr = (here / "assets" / "qr.svg").read_text()
(here / "cv.html").write_text((here / "cv.template.html").read_text().replace("<!--QR-->", qr))

with sync_playwright() as pw:
    b = pw.chromium.launch(args=["--no-sandbox"])
    p = b.new_page(viewport={"width": 794, "height": 1123})
    p.goto((here / "cv.html").as_uri(), wait_until="networkidle")
    p.evaluate("document.fonts.ready")
    # overflow check: nothing may spill past the page
    over = p.evaluate("""() => { const m = document.querySelector('.main'); const s = document.querySelector('.side');
      return { mainOverflow: m.scrollHeight - m.clientHeight, sideOverflow: s.scrollHeight - s.clientHeight } }""")
    print("overflow px:", over)
    p.pdf(path=str(out), width="794px", height="1123px", print_background=True, prefer_css_page_size=False,
          margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
    p.screenshot(path=str(out.with_suffix(".png")))
    b.close()
print("wrote", out)
