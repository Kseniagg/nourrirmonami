import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/common.css";

const CreateAccount = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const isSubmittable = () => (email ? true : false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        switch (e.target.name) {
            //console.log(e.target.id);
            case 'nom':
                setNom(e.target.value);
                break;
            case 'prenom':
                setPrenom(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
        }
    }

    const submit = () => {
        let datas = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password
        };

        let req = new Request("/createAccount",
            {
                method: "POST",
                body: JSON.stringify(datas),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });

        fetch(req)
            .then((response) => response.json())
            .then((response) => {
                if (response.message === "") {
                    setNom("");
                    setPrenom("");
                    setEmail("");
                    setPassword("");
                    navigate("/connexion");
                } else {
                    setMessage(response.message);
                }
            })
    }


    return (
        <>
            <section className="container">
                <h1>Créer un compte</h1>
                {message !== "" && <p>{message}</p>}
                <form id="cr">
                    <div>
                        <label htmlFor="nom">Votre nom</label>
                        <input type="text" name="nom" value={nom} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="prenom">Votre prénom</label>
                        <input type="text" name="prenom" value={prenom} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Votre email</label>
                        <input type="email" name="email" value={email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Votre mot de passe</label>
                        <input type="password" name="password" value={password} onChange={handleChange} />
                    </div>
                    <button className="btn" disabled={!isSubmittable()} type="button" onClick={submit}>
                        Créer un compte
                    </button>
                </form>
                <p>
                    <a href="/connexion">J'ai déjà un compte</a>
                </p>
            </section>
        </>
    );
};

export default CreateAccount;
