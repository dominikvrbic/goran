import { Link } from '@chakra-ui/react';
import React, { Fragment, useState } from 'react';
import type { RouteComponentProps, withRouter } from 'react-router';
import { useAsync } from 'react-use';
import { sUser } from '../api/github.user.api';

type UserParams = {
  login: string;
};

type UserProps = RouteComponentProps<UserParams>;

export const User: React.FC<UserProps> = ({ match }) => {
  const { loading, value, error } = useAsync(() => {
    return sUser(match.params.login);
  }, [match.params.login]);

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable : {''}
      {value?.hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={value?.avatar_url}
            className="round-img"
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{value?.name}</h1>
          <p>Location: {value?.location}</p>
        </div>
        <div>
          {value?.bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{value?.bio}</p>
            </Fragment>
          )}
          <a href={value?.html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {value?.login && (
                <Fragment>
                  <strong>Username:</strong> {value?.login}
                </Fragment>
              )}
            </li>
            <li>
              {value?.company && (
                <Fragment>
                  <strong>Company:</strong> {value?.company}
                </Fragment>
              )}
            </li>
            <li>
              {value?.blog && (
                <Fragment>
                  <strong>Website:</strong> {value?.blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {value?.followers}</div>
        <div className="badge badge-success">Following: {value?.following}</div>
        <div className="badge badge-danger">
          Public Repos: {value?.public_repos}
        </div>
        <div className="badge badge-dark">
          Public Gists: {value?.public_gists}
        </div>
      </div>
    </Fragment>
  );
};
