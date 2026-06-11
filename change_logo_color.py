import os
from PIL import Image

def update_logo_color():
    img_path = r"c:\Users\wahee\OneDrive\Documents\IUN\iun-bourse\public\images\Logo.png"
    if not os.path.exists(img_path):
        print(f"Error: Logo file not found at {img_path}")
        return

    img = Image.open(img_path)
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    # Target color: #1D4492 (29, 68, 146)
    target_r, target_g, target_b = 29, 68, 146

    # We want to find navy blue pixels.
    # In the original design, navy is #0C1B33 (12, 27, 51).
    # Gold is #C9A84C (201, 168, 76).
    # White is (255, 255, 255).
    # Navy pixels have low red/green and blue is the dominant channel.
    count = 0
    for item in data:
        r, g, b, a = item
        # If the pixel is not fully transparent and matches navy criteria:
        # e.g., blue is dominant, and red/green are low (dark blueish).
        if a > 0 and b > r and r < 80 and g < 100:
            # Preserve the original alpha, but set the color to #1D4492
            new_data.append((target_r, target_g, target_b, a))
            count += 1
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(img_path)
    print(f"Successfully updated {count} pixels in Logo.png to #1D4492")

if __name__ == "__main__":
    update_logo_color()
