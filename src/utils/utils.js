export const truncate = (text, totalLength, postFix) => {
    if (!text) {
        return "";
    }

    if (text.length > totalLength) {
        if (!postFix && postFix !== "") {
            postFix = "...";
        }
        const substrLength = (postFix.length < totalLength) ? totalLength - (postFix.length) : 0;
        return text.substr(0, substrLength).concat(postFix);
    }

    return text;
};

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
};
