for (let i in parts) {
    for (let j in parts[i]) {
        Object.freeze(parts[i][j]);
    }
    Object.freeze(parts[i]);
}
Object.freeze(parts);
Object.freeze(options);
console.log("freezed");
