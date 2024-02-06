import React from "react";

const CardForm = ({ card, handleChange, handleSubmit, handleQuit, handleCancel, isNew }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="card border-0">
                <h5 className="text-secondary mp-0 pt-2">Front</h5>
                <div className="card border-0 pb-3">
                    <label htmlFor="front"></label>
                    <textarea
                        id="front"
                        name="front"
                        type="text"
                        className="form-control"
                        placeholder="Front side of card"
                        required={true}
                        value={card.front}
                        onChange={handleChange}
                    />
                </div>
                <h5 className="text-secondary mp-0 pt-2">Back</h5>
                <div className="card border-0 mt-0">
                    <label htmlFor="back"></label>
                    <textarea
                        id="back"
                        name="back"
                        type="text"
                        className="form-control"
                        placeholder="Back side of card"
                        required={true}
                        value={card.back}
                        onChange={handleChange}
                    />
                </div>
            </div>
        {isNew === true ? ( 
            <div>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm px-3 py-2 mt-3 mr-2"
                    onClick={handleQuit}
                >
                    Done
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm px-3 py-2 mt-3"
                >
                    Save
                </button>
            </div>
        ) : (
            <div>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm px-3 py-2 mt-3 mr-2"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm px-3 py-2 mt-3"
                >
                    Submit
                </button>
            </div>
        )}
        </form>
    );
}

export default CardForm;