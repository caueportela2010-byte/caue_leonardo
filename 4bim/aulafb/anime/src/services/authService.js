
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  doc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export async function registerUser(nome, email, senha) {
  const usuario = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  await updateProfile(usuario.user, {
    displayName: nome
  });

  await setDoc(doc(db, "usuarios", usuario.user.uid), {
    nome,
    email: email.trim(),
    criadoEm: serverTimestamp()
  });

  return usuario.user;
}

export async function loginUser(email, senha) {
  const usuario = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  return usuario.user;
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email.trim());
}

export async function logoutUser() {
  await signOut(auth);
}

export async function updateUserName(nome) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Nenhum usuário está conectado.");
  }

  await updateDoc(doc(db, "usuarios", user.uid), {
    nome: nome
  });

  await updateProfile(user, {
    displayName: nome
  });
}