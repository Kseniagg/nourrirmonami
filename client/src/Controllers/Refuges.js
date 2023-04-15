import { useState, useEffect } from "react";
import "../css/common.css";
import "../css/refuges_page.css";

const Refuges = () => {

    const [refuges, setRefuges] = useState([]);

    useEffect(() => {
        fetch("/refuges")
            .then((response) => response.json())
            .then((res) => {
                setRefuges(res)
            });
    }, [])

    return (
        <>

            <section className="container">
                {refuges.map((ref, i) => (
                    <div key={i} className="refuges_article">
                        <h2>{ref.name}</h2>
                        <a href={"/refuge/" + ref.id}>Lire plus</a>
                    </div>


                ))}
            </section>
        </>

    );

};

export default Refuges;