// This function is not scrypt, but very close.
// Difference: it does not take mod against the entire image, it mods against the highest 32 bits of the image as an uint32.

// the hash function should have > 32 bits image size
export function memory_hard (preimage : Uint8Array, hash_function : (x : Uint8Array) => Uint8Array, memory_factor : number) : Uint8Array {

    const memory_hard_image_pool : Array<Uint8Array> = [hash_function(preimage)]
    let phase_2_latest_image : Uint8Array

    for(let i=1; i<memory_factor; i++) {
        memory_hard_image_pool[i] = hash_function(memory_hard_image_pool[i-1])
    }

    phase_2_latest_image = memory_hard_image_pool[memory_factor-1]

    for(let i=0; i<memory_factor; i++) {
        const number_derived = (phase_2_latest_image[0] << 24 | phase_2_latest_image[1] << 16 | phase_2_latest_image[2] << 8 | phase_2_latest_image[3] << 0) >>> 0
        const hash_choice = memory_hard_image_pool[number_derived % memory_hard_image_pool.length]
        phase_2_latest_image = hash_function(ab_xor(hash_choice, phase_2_latest_image))
    }

    return memory_hard_image_pool[memory_hard_image_pool.length-1]
}

function ab_xor (ab1 : Uint8Array, ab2 : Uint8Array) {  // array buffer xor

    const xor = new Uint8Array(ab1.length > ab2.length ? ab1.length : ab2.length)
    xor.set(ab1, 0)
    for (let i=0; i<ab2.length; i++) { xor[i] ^= ab2[i] }
    return xor
}