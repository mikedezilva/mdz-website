import os
from PIL import Image

image_dir = 'insta-content/finals'
images = []
for i in range(1, 7):
    img_path = os.path.join(image_dir, f'code-sound-slide-{i}.jpeg')
    if os.path.exists(img_path):
        img = Image.open(img_path).convert('RGB')
        images.append(img)
    else:
        print(f'Missing {img_path}')

if images:
    output_path = 'code-and-sound-carousel.pdf'
    images[0].save(output_path, save_all=True, append_images=images[1:])
    print(f'Successfully created {output_path}')
else:
    print('No images found.')
