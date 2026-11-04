<!-- Add color customization logic into the active Python file -->
@app.post('/api/votes', response_model=VoteResponse)
async def vote(vote: Vote, current_user: User = Depends(get_current_user)):
    if vote.post_id not in current_user.votes:
        vote = Vote(post_id=vote.post_id, user_id=current_user.id)
        db.add(vote)
        db.commit()
        return VoteResponse(message='Vote casted successfully', vote_id=vote.id)
    else:
        return VoteResponse(message='You have already voted for this post', vote_id=None)