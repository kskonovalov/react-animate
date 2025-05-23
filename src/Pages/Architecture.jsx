import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Helmet from 'react-helmet';

import { ReactComponent as IconArchitecture } from '../assets/icons/a.svg';
import { pdfLink, pageWidth } from '../config';

const PageWrap = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${pageWidth};
  position: relative;
  & > a {
    width: 300px;
    & > div > div:last-child {
      display: none;
    }
  }
  @media (max-width: 768px) {
    padding-top: 90px;
  }
`;

const StyledDocumentWrap = styled.section`
  border: 1px solid #eee;
  width: 100%;
  max-width: 100%;
  height: 792px;
  @media(max-width: 768px) {
  height: auto;
  }
  max-height: 80vh;
`;

const StyledDocument = styled(Document)`
  width: 100%;
  max-width: 100%;
  height: 792px;
  max-height: 80vh;
  @media(max-width: 768px) {
    height: auto;
  }
  transition: opacity 1s;
  opacity: ${props => (props.isloading ? 0 : 1)};
  overflow-y: scroll;
  @media (max-width: 768px) {
    overflow: scroll;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
  display: none;
  }
  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
  & > div {
    height: 80vh;
    min-height: 500px;
    @media (max-width: 768px) {
      max-height: 77vh;
    }
    @media (max-width: 768px) {
      height: auto;
      min-height: 0;
    }
  }
  & canvas {
    max-width: 100%;
    height: auto !important;
    @media(max-width: 768px) {
      height: auto !important;
    }
  }
`;

const StyledPagination = styled.div`
  width: 100%;
  max-width: 100%;
  text-align: center;
  color: #000;
  margin-top: 20px;
`;

const StyledButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #000;
  margin: 0 10px;
  color: #000;
`;

const StyledIcon = styled(IconArchitecture)`
  position: absolute;
  top: 30px;
  left: -70px;
  width: 30px;
  height: auto;
  z-index: 20;
`;

const StyledPage = styled(Page)`
  > div {
    max-height: 100%;
    max-width: 100%;
  }
`;

const Architecture = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);

  const changePage = count => {
    setPageLoading(true);
    setTimeout(() => {
      setPageNumber(pageNumber + count);
      setPageLoading(false);
    }, 1000);
  };

  const NextPage = () => {
    return (
      <StyledButton
        onClick={() => {
          changePage(1);
        }}
      >
        &gt;&gt;
      </StyledButton>
    );
  };
  const PrevPage = () => {
    return (
      <StyledButton
        onClick={() => {
          changePage(-1);
        }}
      >
        &lt;&lt;
      </StyledButton>
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Helmet>
        <title>Da Guo: Architecture</title>
      </Helmet>
      <PageWrap>
        <StyledIcon />
        <StyledDocumentWrap>
          <StyledDocument
            file={pdfLink}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            onLoadError={console.error}
            options={{ workerSrc: '/pdf.worker.js' }}
            isloading={pageLoading ? 1 : 0}
          >
            <StyledPage pageNumber={pageNumber} renderTextLayer={false} />
          </StyledDocument>
        </StyledDocumentWrap>
        <StyledPagination>
          {pageNumber > 1 && <PrevPage />}
          Page {pageNumber} of {numPages}
          {pageNumber < numPages && <NextPage />}
        </StyledPagination>
      </PageWrap>
    </motion.div>
  );
};

export default Architecture;
