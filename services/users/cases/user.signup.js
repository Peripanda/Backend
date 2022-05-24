//Libs
const { signUpFlow } = require('../../../core/aws/cognito')
//Errors
const BadRequestError = require('../../../errors/BadRequestError')
const PasswordHelper = require('../../../helpers/helper.password')

const SignUpUserUseCase = () => ({
    signUp: async (email, password) => {
        if (!email || !password) {
            throw new BadRequestError('Falta información para iniciar sesión')
        }

        if (!PasswordHelper.checkPassword(password)){
            throw new BadRequestError('La contraseña no cumple el formato requerido. Debe tener: mayúscula, minúscula, signo (¡! o ¿?) y números (0-9), además de mínimo 10 caracteres.')
        }
        const auth = await signUpFlow(email, password)
        if (auth) {
            throw new BadRequestError('Falta información para iniciar sesión')
        }
        return auth
    },
})

module.exports = SignUpUserUseCase