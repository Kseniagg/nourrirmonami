import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
    // des variables pour des données
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    // des variables pour des style css
    const [active, setActive] = useState(false);

    // variables pour une redirection et d'appeler une action (reducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // récupérer les données dans une forme
    const dataEmail = (e) => {
        setEmail(e.target.value);
    };
    const dataPassword = (e) => {
        setPassword(e.target.value);
    };

    // toggle le message d'erreur
    const handleClick = () => {
        if (message === "") {
            setActive(true);
            setMessage("")
        } else {
            setActive(false)
            setMessage("")
        };
    };

    // envoie des données et ensuite vérifie le data d'user (ou affiche une erreur) et 
    //connecte si le data est bonne
    const submit = () => {
        let datas = {
            email: email,
            password: password,
        };
        let req = new Request("/connexion", {
            method: "POST",
            body: JSON.stringify(datas),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        fetch(req)
            .then((response) => response.json())
            .then((response) => {
                if (response.reponse) {
                    dispatch({
                        type: "CONNECT_USER",
                        id: response.id,
                    });
                    navigate("/");
                } else {
                    setMessage(response.message);
                }
            });
    };

    return (
        <>
            <section className="container">
                <div className="form_section">
                    <h1 className="form_title">Connexion</h1>
                    {message !== "" && <p className={active ? "hidden" : "popup"} onClick={handleClick}>{message}</p>}
                    <form>
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={dataEmail} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" value={password} onChange={dataPassword} />
                        </div>
                        <button className="button" type="button" onClick={submit}>
                            Me connecter
                        </button>
                    </form>
                    <p>
                        <a className="link" href="/createAccount">Je suis un nouveau ami</a>
                    </p>
                </div>
            </section>
        </>
    );
};
export default Connexion;
