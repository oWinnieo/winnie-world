const collectionNameForListNavGroup = ['learning', 'management', 'testing']
// const collectionNameForLearning = ['english', 'japanese', 'server']
const collectionNameForManagement = ['user', 'listNav', 'intro']
const collectionNameLikeOrFavorite = ['like', 'favorite']
const collectionNameShare = ['share']
const collectionNameComment = ['comment']
const collectionNameItem = ['item']
const collectionNameInteraction = collectionNameLikeOrFavorite.concat(collectionNameComment).concat(collectionNameItem)


export {
    collectionNameForListNavGroup,
    // collectionNameForLearning, as colLearning
    collectionNameForManagement,
    collectionNameInteraction,
    collectionNameLikeOrFavorite,
    collectionNameShare
}
