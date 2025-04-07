const itemDelete = async ({ params, id, listPage }) => {
    const res = await fetch(`${params.urlDomain}?collectionName=${params.collectionName}`, {
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({ id })
    })
    const dataRes = await res.json();
    if (dataRes.success) {
        if (listPage) {
            return listPage
        } else {
            window.location.reload()   
        }
    } else {
        throw new Error('Failed to delete an item.')
    }
}

/* enterDelWord *
const enterDelWord = (val) => {
    if (val === 'delete') { // wtest delete
        showAlert({
            message: 'delete confirm',
            type: "success",
        })
        closeModal()
        itemDelete({ params, id })
    } else {
        showAlert({
            message: 'don\'t delete',
            type: 'danger'
        })
    }
}
/* /enterDelWord */

export {
    itemDelete,
    // enterDelWord
}