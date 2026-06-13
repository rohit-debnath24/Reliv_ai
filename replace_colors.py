import os
import re

directories = ['d:/IEM-Freelancing/Reliv-main/files (3)/src/pages', 'd:/IEM-Freelancing/Reliv-main/files (3)/src/components']

replacements = {
    r"'#FFFFFF'": "'var(--white)'",
    r'"#FFFFFF"': '"var(--white)"',
    r"'#FAFAFA'": "'var(--gray-50)'",
    r'"#FAFAFA"': '"var(--gray-50)"',
    r"'#111111'": "'var(--gray-900)'",
    r'"#111111"': '"var(--gray-900)"',
    r"'#666666'": "'var(--gray-600)'",
    r'"#666666"': '"var(--gray-600)"',
    r"'#9CA3AF'": "'var(--gray-400)'",
    r'"#9CA3AF"': '"var(--gray-400)"',
    r"'#E5E7EB'": "'var(--gray-200)'",
    r'"#E5E7EB"': '"var(--gray-200)"',
    r"'#FFF5F0'": "'var(--cream-200)'",
    r'"#FFF5F0"': '"var(--cream-200)"',
    r"'#FFEEDD'": "'var(--cream-300)'",
    r'"#FFEEDD"': '"var(--cream-300)"',
    r"'#FFFAF7'": "'var(--cream-100)'",
    r'"#FFFAF7"': '"var(--cream-100)"'
}

count = 0
for d in directories:
    for filename in os.listdir(d):
        if filename.endswith(".jsx") and filename != "WelcomeScreen.jsx":
            filepath = os.path.join(d, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Updated {count} files.")
