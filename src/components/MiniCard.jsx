import "../styles/MiniCard.css";

import { LinkIcon } from '@heroicons/react/16/solid';

import utils from "../utils/utils.js";

// Details is an optional list of at most 2 objects 
// Title also has text and a link
const MiniCard = ({ image, title, details }) => {
    const hasDetails = details && utils.isArraySizeInRange(0, 2, details);

    return (
        <article className="mini-card">
            <div>
                <img 
                    src={image.url}
                    alt={image.alt} 
                    className="mini-card-img"
                />
            </div>
            <hr />
            <div>
                <a 
                    href={title.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mini-card-title"
                >
                    <h3>{title.text}</h3>
                    <LinkIcon width="13" className="mini-card-link-icon"/>
                </a>
                {
                    hasDetails &&
                    details.map((detail) => {
                        const [key, value] = Object.entries(detail)[0];
                        return (
                            <p key={key} className="mini-card-detail">
                                {utils.getTitleCase(key)}: {value}
                            </p>
                        );
                    })
                }
            </div>
        </article>
    );
};

export default MiniCard;