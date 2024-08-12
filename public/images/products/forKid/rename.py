import os

directory = 'C:/Code/WebMee/phonemee/public/images/products/forKid'
files = os.listdir(directory)

count = 1

for filename in files:
    if filename.endswith(".webp"):
        new_name = f"productforKid{count}.png"
        
        old_file = os.path.join(directory, filename)
        new_file = os.path.join(directory, new_name)
        
        os.rename(old_file, new_file)
        count += 1

print(">> Complete!")
