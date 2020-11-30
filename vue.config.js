module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            publish: ['github'],
            builderOptions: {
                productName: 'Discord HookTools'
            }
        }
    },

    runtimeCompiler: true,
    assetsDir: 'assets',
}