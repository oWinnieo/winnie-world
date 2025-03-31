const collectionNameForListNavGroup = ['learning', 'management']
const collectionNameForLearning = ['english', 'japanese', 'server']
const collectionNameManagement = ['user', 'listNav', 'intro']
const collectionNameLikeOrFavorite = ['like', 'favorite']
const collectionNameShare = ['share']
const collectionNameComment = ['comment']
const collectionNameItem = ['item']
const collectionNameInteraction = collectionNameLikeOrFavorite.concat(collectionNameComment).concat(collectionNameItem)


export {
    collectionNameForListNavGroup,
    collectionNameForLearning,
    collectionNameManagement,
    collectionNameInteraction,
    collectionNameLikeOrFavorite,
    collectionNameShare
}