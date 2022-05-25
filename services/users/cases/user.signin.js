const { signInFlow } = require('../../../core/aws/cognito');
// Errors
const BadRequestError = require('../../../errors/BadRequestError');
const UnauthorizedError = require('../../../errors/UnauthorizedError');

const SignInUserUseCase = () => ({
  signIn: async (email, password) => {
    if (!email || !password) {
      throw new BadRequestError('Falta información para iniciar sesión');
    }
    const auth = await signInFlow(email, password);

    if (!auth) {
      throw new UnauthorizedError('Contraseña incorrecta');
    }
    const response = {
      accessToken: auth.AuthenticationResult.AccessToken,
      refreshToken: auth.AuthenticationResult.RefreshToken,
      tokenDuration: auth.AuthenticationResult.ExpiresIn,
      tokenType: auth.AuthenticationResult.TokenType,
    };

    return response;
  },
});

module.exports = SignInUserUseCase;
