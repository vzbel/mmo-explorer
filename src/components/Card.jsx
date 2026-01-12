import { LinkIcon } from '@heroicons/react/16/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline'; 
import utils from "../utils/utils.js";
import "../styles/Card.css";

// Details and tags are optional arrays of at most 2 objects.
// Tags are removable by the user
// All other fields are required
// Title object has text and a link
const Card = ({ image, title, details, tags, onRemoveTag, description }) => {
    const hasDetails = details && utils.isArraySizeInRange(0, 2, details);
    const hasTags = tags && utils.isArraySizeInRange(0, 2, tags);

    return (
        <article className="card">
            <div>
                <img 
                    src={image.url} 
                    alt={image.alt}
                    className="card-img" 
                />
            </div>
            <hr />
            <div>
                <div className="card-header flex">
                    <div className="card-header-left">
                        <a 
                            href={title.link} 
                            className="card-header-title flex" 
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h2>{title.text}</h2>
                            <LinkIcon width="18" />
                        </a>
                        {/* An optional maximum of two small details about the item */}
                        <div className="card-details">
                            {
                                hasDetails &&
                                details.map((detail) => {
                                    const [key, value] = Object.entries(detail)[0];
                                    return (
                                        <p key={key} className="card-detail">
                                            {utils.getTitleCase(key)}: {value}
                                        </p>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="card-tags">
                        {
                            hasTags && 
                            tags.map((tag) => {
                                const [key, value] = Object.entries(tag)[0];
                                return (
                                    <button 
                                        key={key} 
                                        onClick={() => onRemoveTag(tag)}
                                        className="card-tag flex"
                                    >
                                        <p>{value}</p>
                                        <MinusCircleIcon width="18" />
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
                <p className="card-description">{description}</p>
            </div>
        </article>
    );
};

export default Card;