import React from "react";
import { Pane, Icon, Heading } from "evergreen-ui";
import { TOPBAR_HEIGHT } from "./constant";

export default function Topbar({
  title,
  rightButtonIcon = null,
  onClickRightButton = null,
  leftButtonIcon = null,
  onClickLeftButton = null,
  rightButtonIconColor = "#333",
}) {
  const BUTTON_WIDTH = TOPBAR_HEIGHT - 5;

  let isRightButtonExists = rightButtonIcon !== null;
  let gridTemplateColumns = `${BUTTON_WIDTH}px 1fr`;

  if (isRightButtonExists) {
    gridTemplateColumns = `${BUTTON_WIDTH}px 1fr ${BUTTON_WIDTH}px`;
  }

  return (
    <Pane
      height={TOPBAR_HEIGHT}
      backgroundColor="#fff"
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      userSelect="none"
      boxShadow="0px 2px 3px #e8e8e8"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="tap"
        onClick={onClickLeftButton}
      >
        <Icon icon={leftButtonIcon} />
      </Pane>

      <Pane
        display="flex"
        alignItems="center"
        overflow="hidden"
        textOverflow="ellipsis"
        paddingRight={10}
      >
        <Heading
          fontFamily="inherit"
          color="#333"
          fontWeight="bold"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Heading>
      </Pane>

      {isRightButtonExists && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="tap"
          onClick={onClickRightButton}
        >
          <Icon icon={rightButtonIcon} color={rightButtonIconColor} />
        </Pane>
      )}
    </Pane>
  );
}
