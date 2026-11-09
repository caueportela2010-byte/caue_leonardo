async function fazerLogin() {
  if (!email.trim() || !senha) {
    Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
    return;
  }

  try {
    setCarregando(true);

    console.log('Tentando fazer login...');

    const resultado = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      senha
    );

    console.log('Login realizado:', resultado.user.uid);
    console.log('Indo para Home...');

    navigation.replace('Home');

  } catch (error) {
    console.log('ERRO:', error.code);
    console.log('MENSAGEM:', error.message);

    Alert.alert('Erro no login', error.message);

  } finally {
    setCarregando(false);
  }
}