import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SingupSignin() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setloginForm] = useState(false);
    const navigate = useNavigate();

    function signupWithEmail() {
        setLoading(true);
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("confirm password: ", confirmPass);

        if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
            if (password === confirmPass) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log("User>>>", user);
                        toast.success("User Created!")
                        setLoading(false);
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPass("");
                        createDoc(user)
                        navigate("/dashboard")
                        // Create A doc with user id as the following id
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoading(false);
                        // ..
                    });
            } else {
                toast.error("Password and Confirm Password don't match!");
                setLoading(false);
            }
        }
        else {
            toast.error("All fields are mandatory")
            setLoading(false);
        }
    }

    function loginWithEmail() {
        console.log("email", email);
        console.log("password", password);
        setLoading(true);

        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User Loged In!");
                    console.log("User Loged In!", user);
                    setLoading(false);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setLoading(false);
                    toast.error(errorMessage);
                });

        }
        else {
            toast.error("All fiels are mandatory!");
            setLoading(false);
        }
    }

    async function createDoc(user) {
        // Make sure that the doc with the uid doesn't exist
        // create a doc
        setLoading(true);
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "useer", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createAt: new Date(),
                });
                toast.success("Doc Created!")
            }
            catch (e) {
                toast.error(e.message);
                setLoading(false);
            }
        }
        else {
            // toast.error("Doc already exists");
            setLoading(false);
        }
    }

    function googleAuth() {
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("user>>", user);
                navigate("/dashboard");
                createDoc(user);
                setLoading(false);
                toast.success("User Authenticated");
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                toast.error(errorMessage);
            });
        }catch (e){
            toast.error(e.message)
            setLoading(false);
        }
        
    }

    return (
        <>
            {loginForm ? (
                <div className="signup-wrapper" >
                    <h2 className="title">
                        Login on <span style={{ color: "var(--theme)" }}>Financely</span>
                    </h2>
                    <form>
                        <Input
                            type="email"
                            label={"Enter Email"}
                            state={email}
                            setState={setEmail}
                            placeholder={"Johndoe@gmail.com"}
                        />

                        <Input
                            type="password"
                            label={"Password"}
                            state={password}
                            setState={setPassword}
                            placeholder={"Example@123"}
                        />

                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Login Using Email and Password"}
                            onClick={loginWithEmail}
                        />

                        <p className="p-login"> or </p>

                        <Button
                            onClick={googleAuth}
                            text={loading ? "Loading..." : "Login Using Google"} blue={true}
                        />

                        <p className="p-login" onClick={() => setloginForm(!loginForm)}>
                            Or Don't Have An Acount ? Click Here
                        </p>

                    </form>
                </div>
            ) : (
                <div className="signup-wrapper" >
                    <h2 className="title">
                        Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
                    </h2>
                    <form>
                        <Input
                            label={"Full Name"}
                            state={name}
                            setState={setName}
                            placeholder={"John Doe"}
                        />

                        <Input
                            type="email"
                            label={"Enter Email"}
                            state={email}
                            setState={setEmail}
                            placeholder={"Johndoe@gmail.com"}
                        />

                        <Input
                            type="password"
                            label={"Password"}
                            state={password}
                            setState={setPassword}
                            placeholder={"Example@123"}
                        />

                        <Input
                            type="password"
                            label={"Confirm Password"}
                            state={confirmPass}
                            setState={setConfirmPass}
                            placeholder={"Example@123"}
                        />

                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Signup Using Email and Password"}
                            onClick={signupWithEmail}
                        />

                        <p className="p-login"> or </p>

                        <Button
                            onClick={googleAuth}
                            text={loading ? "Loading..." : "Signup Using Google"} blue={true}
                        />

                        <p className="p-login" onClick={() => setloginForm(!loginForm)}>
                            Or Have An Acount Already ? Click Here
                        </p>


                    </form>
                </div>
            )}
        </>
    )

}

export default SingupSignin;