import { auth, provider } from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth"

import Cookies from "universal-cookie"
const cookies = new Cookies()

export const Auth = (props) => {

    const { setIsAuth } = props;

    const signWithGoogle = async () => {

        try {
            const res = await signInWithPopup(auth, provider);
            cookies.set("auth-token", res.user.refreshToken)
            setIsAuth(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="auth">
            <p> Sign In with Google to continue</p>
            <button onClick={signWithGoogle}>Sign In with Google</button>
        </div>
    )
}