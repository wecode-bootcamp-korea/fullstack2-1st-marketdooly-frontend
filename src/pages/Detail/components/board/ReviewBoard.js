import React, { Component } from 'react';
import Review from './Review';
import { API_ENDPOINT } from '../../../../api';
import './Board.scss';

class ReviewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      reviewCommentModal: false,
      totalReviewCount: 0,
      pageNumArray: [],
      reviewData: [],
      newReviewTitle: '',
      newReviewText: '',
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const { productId } = this.state;
    const url = `${API_ENDPOINT}/products/${productId}/reviews/count?productId=${productId}`;
    fetch(url, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const pageNum = parseInt(data.totalCount / 10 + 1);
        this.setState(
          {
            totalReviewCount: data.totalCount,
            pageNumArray: new Array(pageNum).fill(0),
          },
          this.getReviesByPageId(0)
        );
      })
      .catch(console.log);
  }

  getReviesByPageId = idx => {
    const { productId } = this.state;
    const offset = idx * 10;
    const limit = 10;
    const url = `${API_ENDPOINT}/products/${productId}/reviews/?productId=${productId}&offset=${offset}&limit=${limit}`;
    fetch(url, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewData: data || [],
        });
      })
      .catch(console.log);
  };

  isValidInputReviewPopup = () => {
    const { reviewCommentModal } = this.state;
    this.setState({
      reviewCommentModal: !reviewCommentModal,
    });
  };

  closeCommentModal = () => {
    this.setState({
      reviewCommentModal: false,
    });
  };

  clickReviewHandler = _id => {
    const newArr = this.state.reviewData.map(review => {
      if (review.id === _id) {
        review.isOpenReviewBox = !review.isOpenReviewBox;
        return review;
      } else {
        review.isOpenReviewBox = false;
        return review;
      }
    });

    this.setState({ reviewData: newArr });
  };

  addReview = () => {
    const { productId, newReviewTitle, newReviewText } = this.state;
    const url = `${API_ENDPOINT}/products/${productId}/reviews`;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        title: newReviewTitle,
        text: newReviewText,
      }),
    })
      .then(res => {
        if (res.status === 201) {
          alert('?????? ????????? ?????????????????????');
          this.closeCommentModal();
          this.getReviesByPageId(0);
        } else if (res.status === 401) {
          alert('?????? ?????? ????????? ????????????');
        } else {
          alert('?????? ?????? ???????????? ????????? ?????????????????????');
        }
      })
      .catch(console.log);
  };

  render() {
    const { inputHandler, getReviesByPageId, addReview, closeCommentModal } =
      this;
    const { reviewRef } = this.props;
    const { reviewCommentModal, pageNumArray, reviewData } = this.state;

    return (
      <div className='Board' ref={reviewRef}>
        <div className='boardAlign'>
          <div className='board'>
            <div className='titleAlign'>
              <ul className='titleList'>
                <h2 className='title'>PRODUCT REVIEW</h2>
                <li className='listStyle'>
                  ????????? ?????? ????????? ????????? ???????????????. ?????? ???????????? ?????????
                  ?????? ?????? ???????????? ?????? ?????? ??????????????? ????????? ??? ????????????.
                </li>
                <li className='listStyle'>
                  ????????????, ??????(??????/??????/??????)?????? ?????? ??? ??????????????? ????????????
                  ???&nbsp;
                  <a href='/' className='_1_1inquir'>
                    1:1 ??????
                  </a>
                  ??? ???????????????.
                </li>
              </ul>
              <select className='selectBox'>
                <option value='1'>???????????????</option>
                <option value='2'>??????????????????</option>
                <option value='3'>???????????????</option>
              </select>
            </div>
            <div className='titleStyle'>
              <table className='style'>
                <tbody>
                  <tr>
                    <th className='num'>??????</th>
                    <th className='reviewTitle'>??????</th>
                    <th className='userClass'></th>
                    <th className='writer'>?????????</th>
                    <th className='writeDate'>?????????</th>
                    <th className='selectNumber'>??????</th>
                    <th className='viewNumber'>??????</th>
                  </tr>
                </tbody>
              </table>
              {reviewData.map(data => {
                return (
                  <Review
                    key={data.id}
                    {...data}
                    clickReviewHandler={this.clickReviewHandler}
                  />
                );
              })}
            </div>
            <div className='buttonAlign'>
              <button
                className='buttonStyle'
                onClick={this.isValidInputReviewPopup}
              >
                ????????????
              </button>
            </div>
            <div className='commentAlign commentPageButn'>
              <span className='firstPageButn commentAlign'>??????</span>
              <span className='comment commentAlign'>???</span>
              {pageNumArray.map((el, idx) => {
                return (
                  <span
                    key={idx}
                    className='comment commentAlign'
                    onClick={() => getReviesByPageId(idx)}
                  >
                    {idx + 1}
                  </span>
                );
              })}
              <span className='comment commentAlign'>???</span>
              <span className='comment commentAlign'>??????</span>
            </div>
            {reviewCommentModal && (
              <div className='modalAlign'>
                <div className='modalPopUp'>
                  <div className='modalTitle'>?????? ????????????</div>
                  {/* <div className='modalProductNav'></div> */}
                  <div className='commentTitle'>
                    <span>??????</span>
                    <textarea
                      className='commentTitleInput'
                      type='text'
                      name='newReviewTitle'
                      placeholder='???????????? ????????? ????????? ??????????????????'
                      onChange={inputHandler}
                    />
                  </div>
                  <div className='commentContent'>
                    <span>??????</span>
                    <textarea
                      className='commentContentInput'
                      type='text'
                      name='newReviewText'
                      placeholder='????????? ??????????????? ?????? ????????????'
                      onChange={inputHandler}
                    />
                  </div>
                  <div className='modalButnAlign'>
                    <button className='modalButn' onClick={addReview}>
                      ????????????
                    </button>
                    <button className='modalButn' onClick={closeCommentModal}>
                      ??????
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewBoard;
