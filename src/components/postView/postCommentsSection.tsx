import React, { useState } from 'react';
import TimeAgo from '../../helper/timeElapsed';
import styles from './postCommentsSection.module.scss';

type PostCommentsSectionProps = {
  showNMessageOnDefault?: number,
  showNMessagesMore?: number
}

interface ICommentData {
  id: string
  uid: string
  mid: string
  time: number
  sender: string
  message: string
}

const commentsData: ICommentData[] = [
  {
    id: '1',
    uid: 'asd',
    mid: 'asd',
    time: 123456,
    sender: 'SenderName',
    message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas itaque laborum distinctio placeat eaque voluptas, rerum fugiat recusandae! Enim autem dicta, maiores, ullam voluptatibus, obcaecati nulla provident doloribus laboriosam veniam ex natus laborum cupiditate dignissimos? Magni beatae soluta impedit ex! Ad delectus vero et? Obcaecati suscipit saepe nesciunt enim id!',
  },
]

const PostCommentsSection: React.FC<PostCommentsSectionProps> = ({showNMessageOnDefault = 5, showNMessagesMore = 5}) => {

  const [rowsDisplay, setRowsDisplay] = useState<number>(showNMessageOnDefault);
  const [newMessage, setNewMessage] = useState<string>('');

  const showMore = () => {
    setRowsDisplay(rowsDisplay + showNMessagesMore)
  }

  const showLess = () => {
    setRowsDisplay(showNMessageOnDefault)
  }

  return (
    <div className={styles.container}>
      <h2>Discussion</h2>
      {
        commentsData.slice(0, rowsDisplay).map(x => {
          return (
            <div key={x.id} className={styles.messagebox}>
              <span className={styles.messageInfo}>
                <h4>{x.sender}</h4>
                <h5>{TimeAgo(x.time)}</h5>
              </span>
              <p>{x.message}</p>
            </div>
          )
        })
      }
      <div className={styles.showMoreLess}>
        <h3>Comment post</h3>
        {
          rowsDisplay > showNMessageOnDefault
            ? <button onClick={() => showLess()}>Show less</button>
            : null
        }
        {
          rowsDisplay < commentsData.length
            ? <button onClick={() => showMore()}>Show more</button>
            : null
        }
      </div>
      <div className={styles.newMessage}>
        <textarea 
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          rows={4}
        />
        <button>Send</button>
      </div>
    </div>
  )
}

export default PostCommentsSection