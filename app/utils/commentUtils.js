import { COMMUNITY_ANSWER_COMMENT_VOTES_THRESHOLD } from '~/utils/constants';

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
      const createdFirst = a.createdAt ? a.createdAt : new Date().toISOString();
      const createdSecond = b.createdAt ? b.createdAt : new Date().toISOString();
      let firstComparingTimestamp = createdFirst;
      let secondComparingTimestamp = createdSecond;
      if (a.updatedAt !== null && a.updatedAt !== undefined && a.updatedAt > createdFirst) {
        firstComparingTimestamp = a.updatedAt;
      }
      if (b.updatedAt !== null && b.updatedAt !== undefined && b.updatedAt > createdSecond) {
        secondComparingTimestamp = b.updatedAt;
      }
      if (secondComparingTimestamp > firstComparingTimestamp) {
        return 1;
      } else if (secondComparingTimestamp < firstComparingTimestamp) {
        return -1;
      }
      return 0;
    };
  
    const selectedCommunityAnswerComment = maxVotesComments.length > 1
      ? (maxVotesComments.sort(recentActivitySortingFunction))[0]
      : maxVotesComments[0];
    const approvedByAdminCommentInList = comments.some(comm => comm.approvedBy);
  
    if (comments.length < 3 && approvedByAdminCommentInList) {
      return [selectedCommunityAnswerComment.id, comments];
    }
    const commentsWithoutCommunityAnswer = comments.filter(
      comm => comm.id !== selectedCommunityAnswerComment.id);
    if (approvedByAdminCommentInList && selectedCommunityAnswerComment.approvedBy) {
      return [selectedCommunityAnswerComment.id, comments];
    } else if (approvedByAdminCommentInList && !selectedCommunityAnswerComment.approvedBy) {
      const reorderedComments = [...commentsWithoutCommunityAnswer];
      reorderedComments.splice(1, 0, selectedCommunityAnswerComment);
      return [selectedCommunityAnswerComment.id, reorderedComments];
    } else if (!approvedByAdminCommentInList) {
      const reorderedComments = [...commentsWithoutCommunityAnswer];
      reorderedComments.unshift(selectedCommunityAnswerComment);
      return [selectedCommunityAnswerComment.id, reorderedComments];
    }
    return [null, comments];
  }
  
module.exports = {
  reorderHighlightedComments
}