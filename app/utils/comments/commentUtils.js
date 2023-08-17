import { COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD } from '../constants';

function reorderHighlightedComments(comments) {
  if (comments.length === 0) {
    return [null, comments];
  }
  if (comments.length === 1) {
    const communityAnswerCommentId = (parseInt(comments[0].votes, 10)
        >= COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD)
      ? comments[0].id : null;
    return [communityAnswerCommentId, comments];
  }
  let mostVotesInComment = comments.reduce((previous, current) => {
    const votesPrevious = previous.votes ? parseInt(previous.votes, 10) : 0;
    const votesCurrent = current.votes ? parseInt(current.votes, 10) : 0;
    return (votesCurrent > votesPrevious ? current : previous);
  });
  mostVotesInComment = mostVotesInComment.votes ? parseInt(mostVotesInComment.votes, 10) : 0;
  const hasCommunityAnswer = mostVotesInComment >= COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD;
  if (!hasCommunityAnswer) {
    return [null, comments];
  }

  const maxVotesComments = comments.filter((comment) => {
    const votesForComment = comment.votes ? parseInt(comment.votes, 10) : 0;
    return votesForComment === mostVotesInComment;
  });

  const recentActivitySortingFunction = (a, b) => {
    const createdFirst = a.createdat ? a.createdat : new Date().toISOString();
    const createdSecond = b.createdat ? b.createdat : new Date().toISOString();
    let firstComparingTimestamp = createdFirst;
    let secondComparingTimestamp = createdSecond;
    if (a.updatedat !== null && a.updatedat !== undefined && a.updatedat > createdFirst) {
      firstComparingTimestamp = a.updatedat;
    }
    if (b.updatedat !== null && b.updatedat !== undefined && b.updatedat > createdSecond) {
      secondComparingTimestamp = b.updatedat;
    }
    if (secondComparingTimestamp > firstComparingTimestamp) {
      return 1;
    } if (secondComparingTimestamp < firstComparingTimestamp) {
      return -1;
    }
    return 0;
  };

  const selectedCommunityAnswerComment = maxVotesComments.length > 1
    ? (maxVotesComments.sort(recentActivitySortingFunction))[0]
    : maxVotesComments[0];
  const approvedbyAdminCommentInList = comments.some((comm) => comm.approvedby);

  if (comments.length < 3 && approvedbyAdminCommentInList) {
    return [selectedCommunityAnswerComment.id, comments];
  }
  const commentsWithoutCommunityAnswer = comments.filter(
    (comm) => comm.id !== selectedCommunityAnswerComment.id,
  );
  if (approvedbyAdminCommentInList && selectedCommunityAnswerComment.approvedby) {
    return [selectedCommunityAnswerComment.id, comments];
  } if (approvedbyAdminCommentInList && !selectedCommunityAnswerComment.approvedby) {
    const reorderedComments = [...commentsWithoutCommunityAnswer];
    reorderedComments.splice(1, 0, selectedCommunityAnswerComment);
    return [selectedCommunityAnswerComment.id, reorderedComments];
  } if (!approvedbyAdminCommentInList) {
    const reorderedComments = [...commentsWithoutCommunityAnswer];
    reorderedComments.unshift(selectedCommunityAnswerComment);
    return [selectedCommunityAnswerComment.id, reorderedComments];
  }
  return [null, comments];
}

export default reorderHighlightedComments;
