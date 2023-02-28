export function supportsWorksType() {
    let supports = false
    const tester = {
        get type() {supports = true}
    }
    try {
       const worker = new Worker('blob://', tester).terminate()
    } finally {
        return supports
    }
}