import { LinkIcon, MinusIcon } from '@heroicons/react/24/solid';
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
        <article>
            <div>
                <img src={image.url} alt={image.alt} />
            </div>
            <div>
                <div>
                    <div>
                        <a href={title.link}>
                            <h2>{title.text}</h2>
                            <LinkIcon width="20" />
                        </a>
                        {/* An optional maximum of two small details about the item */}
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
                    <div>
                        {
                            hasTags && 
                            tags.map((tag) => {
                                const [key, value] = Object.entries(tag)[0];
                                return (
                                    <button key={key} onClick={() => onRemoveTag(tag)}>
                                        {utils.getTitleCase(key)}: {value}
                                        <MinusIcon width="16"/>
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default Card;