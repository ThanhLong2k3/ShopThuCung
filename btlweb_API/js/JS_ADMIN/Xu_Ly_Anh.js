async function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

async function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            const formattedBase64 = base64String.includes('data:image') 
                ? base64String 
                : `data:${file.type};base64,${base64String.split(',')[1]}`;
            resolve(formattedBase64);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
function validateImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        throw new Error('Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF.');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error('Kích thước file quá lớn. Tối đa 5MB.');
    }

    return true;
}
function previewImage(event, previewElementId = 'preview') {
    const input = event.target;
    const preview = document.getElementById(previewElementId);
    
    if (input.files && input.files[0]) {
        try {
            validateImage(input.files[0]);
            
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                preview.style.maxWidth = '200px';
                preview.style.maxHeight = '200px';
                preview.style.objectFit = 'cover';
            };
            reader.readAsDataURL(input.files[0]);
        } catch (error) {
            alert(error.message);
            input.value = '';
            preview.src = '';
            preview.style.display = 'none';
        }
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

function base64ToBinary(base64String) {
    const base64WithoutHeader = base64String.includes(',') 
        ? base64String.split(',')[1] 
        : base64String;
    
    const binaryString = window.atob(base64WithoutHeader);
    
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes;
}


async function handleImageUpload(file) {
    try {
        validateImage(file);  // Kiểm tra định dạng và kích thước ảnh
        const compressedImage = await compressImage(file);  // Nén ảnh
        const base64String = await readFileAsBase64(compressedImage);  // Chuyển ảnh sang Base64
        return base64String;  // Trả về chuỗi Base64 đã xử lý
    } catch (error) {
        throw new Error(`Lỗi xử lý ảnh: ${error.message}`);
    }
}

window.readFileAsBase64=readFileAsBase64;
window.handleImageUpload=handleImageUpload;
window.base64ToBinary=base64ToBinary;
window.compressImage=compressImage;