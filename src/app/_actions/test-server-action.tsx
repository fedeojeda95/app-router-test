'use server'
 
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function runTestAction() {
    console.log("Hello from the server!")
    await sleep(2000);
    return true
}