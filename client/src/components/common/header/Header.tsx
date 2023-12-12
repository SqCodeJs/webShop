import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../utils/device';
import LoginPanel from '../../LoginPanel';
import { LogoHeader, PageWrapper } from '../../../utils/styledComponents';
import { RootState } from '../../../state/reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import NavToggle from '../Navigation/components/NavToggle';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchBar from './SearchBar';
import Icon from '../../atoms/Icon';
import {
    faShoppingBag,
    faSignInAlt,
    faUser,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Navigation from '../Navigation/components/Navigation';
import RenderMainNavigation from '../Navigation/render/renderMainNavigation';
import Slider from '../../Slider';
import { toggleFlag } from '../../../state/actions/flagsActions';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d9ae8;
    position: relative;
    max-width: 1280px;
    margin: 0 auto;

    @media ${device.tablet} {
        background-color: unset;
    }
`;

const Wrapp = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;

    @media ${device.tablet} {
        flex-direction: column;
    }

    @media ${device.laptop} {
        flex-direction: row;
    }
`;

const Icons = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.tablet} {
        margin-left: auto;
    }
`;

const LinkButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    color: white;

    &:hover {
        cursor: pointer;
        color: #aabcc9;
    }

    @media ${device.tablet} {
        width: 28px;
        height: 28px;
        color: #2d9ae8;

        &:hover {
            color: #1684d3;
        }
    }
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    color: white;
    border: none;
    background-color: transparent;

    &:hover {
        cursor: pointer;
        color: #aabcc9;
    }

    @media ${device.tablet} {
        width: 28px;
        height: 28px;
        color: #2d9ae8;

        &:hover {
            color: #1684d3;
        }
    }
`;

const Header = () => {
    const { basket, flags } = useSelector((state: RootState) => state);
    const { navigation: isOpenNav } = flags;
    const [loginFlag, setLoginFlag] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const isHome = location.pathname === '/';
    const dispatch = useDispatch();

    const loginFlagToggle = () => {
        setLoginFlag(!loginFlag);
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: isMobile
                        ? theme.palette.background.default
                        : theme.palette.background.paper,
                }}
            >
                <PageWrapper>
                    <Container>
                        {isMobile && <NavToggle isOpenNav={isOpenNav} />}
                        <LogoHeader to="/">sklep</LogoHeader>
                        <Icons
                            onMouseLeave={() => {
                                setLoginFlag(false);
                            }}
                        >
                            {isMobile && (
                                <Button
                                    onClick={() =>
                                        dispatch(toggleFlag('search'))
                                    }
                                >
                                    <Icon icon={faSearch} />
                                </Button>
                            )}
                            <LinkButton to="/userpanel">
                                <Icon icon={faUser} />
                            </LinkButton>
                            <Button
                                onClick={() => {
                                    loginFlagToggle();
                                    setIsHover(false);
                                }}
                            >
                                <Icon icon={faSignInAlt} />
                            </Button>
                            <LinkButton
                                to="/card"
                                onMouseEnter={() => {
                                    setIsHover(true);
                                    setLoginFlag(false);
                                }}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                <Icon icon={faShoppingBag} />
                            </LinkButton>
                            {loginFlag && (
                                <LoginPanel loginFlagToggle={loginFlagToggle} />
                            )}
                            {/* {isHover && (
                            <YourCard
                                basket={basket.items}
                                setIsHover={setIsHover}
                                render={BasketCard}
                            />
                        )} */}
                        </Icons>
                    </Container>
                </PageWrapper>
            </div>
            <SearchBar />
            <PageWrapper>
                <Wrapp>
                    {isOpenNav || !isMobile ? (
                        <Navigation render={RenderMainNavigation} />
                    ) : (
                        ''
                    )}
                    {isHome && <Slider />}
                </Wrapp>
            </PageWrapper>
        </>
    );
};

export default Header;
