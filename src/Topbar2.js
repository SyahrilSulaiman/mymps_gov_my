import React from "react";
import { Pane, Icon, Heading } from "evergreen-ui";
import { TOPBAR_HEIGHT } from "./constant";

export default function Topbar({
  title,
  color = "white",
  backgroundColor = null,
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
      backgroundColor={backgroundColor}
      display="grid"
      gridTemplateColumns={gridTemplateColumns}
      userSelect="none"
      position="relative"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Pane
        color={color}
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="tap"
        onClick={onClickLeftButton}
      >
        <Icon icon={leftButtonIcon} />
      </Pane>

      <Pane
        color={color}
        display="flex"
        alignItems="center"
        overflow="hidden"
        textOverflow="ellipsis"
        paddingRight={10}
      >
        <Heading
          fontFamily="inherit"
          color={color}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Heading>
      </Pane>

      {isRightButtonExists && (
        <Pane
          color={color}
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
