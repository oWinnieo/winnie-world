import './addItem.scss';
export const AddItem = () => {
    return (
        <form className="area-form flex flex-col gap-3">
            <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Title"></input>
            <input
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Content"></input>
            <button>Submit</button>
        </form>
    )
}