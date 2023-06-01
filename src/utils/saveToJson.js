export const saveToJson = (data, jsonName) => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${jsonName}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}