/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PointUtils from "../../functions/PointsController";
import PointModel from "../../models/PointModel";

import "./styles.css";
import Header from "../../components/Header";
import { FiArrowLeft } from "react-icons/fi";

interface Params {
    point_id:string
}

const PointDetail: React.FC = () => {

    const location = useParams<Params>();
    const pointId = Number(location.point_id);

    const [point, setPoint] = useState<PointModel>();


    /**
     * Get point details
     */
    useEffect(() => {
        PointUtils.getPointDetailsById(pointId, setPoint)
    }, [pointId])

    return (<>
        <div id="point-detail">

            <Header backLink={{text: "Back to main", link: "/", icon: FiArrowLeft}}/>

            <main>
                <h1>Point Detail</h1>

                {
                    point &&
                    <>
                        <h2>{point.name}</h2>

                        <div className="point-image-wrapper">
                            <img src={point.image} alt="Missing image"/>
                        </div>


                        <div className="items-wrapper">
                            <h3>Items: </h3>
                            <div className="items-list">
                                {point.items.map(item => {
                                    return <div className="item">
                                        {/* <img src={item.} alt=""/> */}
                                        <span>{item}</span>
                                    </div>
                                })}
                            </div>
                        </div>

                        <div className="locations-details-wrapper">
                            <div className="span-span-wrapper">
                                <span className="title">UF</span>
                                <span className="value">{point.uf || "not informed"}</span>
                            </div>
                            <div className="span-span-wrapper">
                                <span className="title">City</span>
                                <span className="value">{point.city || "not informed"}</span>
                            </div>
                            <div className="span-span-wrapper">
                                <span className="title">email</span>
                                <span className="value">{point.email || "not informed"}</span>
                            </div>
                            <div className="span-span-wrapper">
                                <span className="title">Whatsapp</span>
                                <span className="value">{point.whatsapp || "not informed"}</span>
                            </div>
                        </div>

                    </>

                }
            </main>

        </div>
    </>);
}

export default PointDetail;