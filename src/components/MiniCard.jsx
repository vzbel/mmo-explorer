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
                />
            </div>
            <hr />
            <div>
                <a 
                    href={title.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h3>{title.text}</h3>
                    <LinkIcon width="16" />
                </a>
                {
                    hasDetails &&
                    details.map((detail) => {
                        const [key, value] = Object.entries(detail)[0];
                        return (
                            <p key={key}>
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