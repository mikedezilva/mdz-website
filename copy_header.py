import re

with open('adpod.html', 'r') as f:
    adpod = f.read()

header_match = re.search(r'<!-- Header -->.*?</header>', adpod, re.DOTALL)
nav_match = re.search(r'<!-- Mobile Nav -->.*?</nav>', adpod, re.DOTALL)
header = header_match.group(0) if header_match else ''
nav = nav_match.group(0) if nav_match else ''

for page in ['web3.html', 'enterprise.html']:
    with open(page, 'r') as f:
        content = f.read()
    
    # Replace header
    content = re.sub(r'<!-- Header -->.*?</header>', header, content, flags=re.DOTALL)
    if '<!-- Header -->' not in content and '<header class="site-header">' in content:
        content = re.sub(r'<header class="site-header">.*?</header>', header, content, flags=re.DOTALL)
        
    # Replace mobile nav
    if '<!-- Mobile Nav -->' in content:
        content = re.sub(r'<!-- Mobile Nav -->.*?</nav>', nav, content, flags=re.DOTALL)
    elif '<nav id="mobile-nav"' in content:
        content = re.sub(r'<nav id="mobile-nav".*?</nav>', nav, content, flags=re.DOTALL)
    else:
        # Insert after header
        content = content.replace('</header>', '</header>\n\n    ' + nav)
        
    with open(page, 'w') as f:
        f.write(content)

print("Updated HTML sections.")
