const collectionNameForListNavGroup = ['learning', 'management']
const collectionNameForLearning = ['english', 'japanese', 'server']
const collectionNameManagement = ['user', 'listNav']
const collectionNameLikeOrFavorite = ['like', 'favorite']
const collectionNameShare = ['share']
const collectionNameComment = ['comment']
const collectionNameInteraction = collectionNameLikeOrFavorite.concat(collectionNameComment)


export {
    collectionNameForListNavGroup,
    collectionNameForLearning,
    collectionNameManagement,
    collectionNameInteraction,
    collectionNameLikeOrFavorite,
    collectionNameShare
}