self.__uv$config = {
    prefix: '/active/go/',
    bare:'/b/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/active/uv.handler.js',
    bundle: '/active/uv.bundle.js',
    config: '/active/uv.config.js',
    sw: '/active/uv.sw.js',
};
