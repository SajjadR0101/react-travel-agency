export const includesStringInArray = (str, arr) => {
    for (let item of arr) {
        if (str.includes(item)) return true;
    }

    return false;
};

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


export function resizeAndConvertToBase64(file, maxWidth, maxHeight, callback) {

    const img = new Image();

    img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }
        canvas.width = width;
        canvas.height = height;

        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/png");

        callback(dataUrl);
    };

    img.src = URL.createObjectURL(file);
}

export const seperateValue = (value, seperateCount) => {
    const loopCount = Math.floor(value.length / seperateCount)
    const seperatedValue = []

    for (let i = 0; i < loopCount; i++) {
        seperatedValue.push(value.slice((i * seperateCount), ((i + 1) * seperateCount)))
    }

    return [seperatedValue, value.slice(loopCount * seperateCount)]
}

export const insertSpace = (value, seperateCount) => {
    value = value.replaceAll(' ', '')
    const loopCount = Math.floor((value.length - 1) / seperateCount)
    let finalValue = ''

    for (let i = 0; i < loopCount; i++) {
         finalValue += `${(value.slice((i * seperateCount), ((i + 1) * seperateCount)))} `
    }

    finalValue += value.slice(loopCount * seperateCount)

    return finalValue
}

export const minutesToHourFormat = (min) => min && min > 60 ? `${Math.floor(min / 60)}h ${min % 2 !== 0 ? `${String(min % 60).padStart(2, "0")}m` : ''}` : `${String(min % 60).padStart(2, "0")}m`

export const timeFormater = (time) => time && time.startsWith('0') ? time.slice(1) : time