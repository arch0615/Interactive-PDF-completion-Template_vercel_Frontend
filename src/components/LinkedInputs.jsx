import { useRef, useCallback, useState } from 'react';

/**
 * LinkedInputs — Multiple <input> fields that behave as a single continuous input.
 * - Text overflow pushes to the next field
 * - Backspace at start pulls text from previous field
 * - Clicking anywhere focuses the group
 * - Ctrl+A selects all text across all fields
 * - Delete/Backspace with all selected clears everything
 */

// Measure text width in pixels using the input's actual font
function measureTextWidth(input, text) {
  if (!input || !text) return 0;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const style = getComputedStyle(input);
  ctx.font = `${style.fontSize} ${style.fontFamily}`;
  return ctx.measureText(text).width;
}

// Get available width inside input (minus padding)
function getAvailableWidth(input) {
  if (!input) return 200;
  const style = getComputedStyle(input);
  return input.offsetWidth - parseFloat(style.paddingLeft || 0) - parseFloat(style.paddingRight || 0);
}

// Find how many characters fit in the input based on actual pixel width
function findFitLength(input, text) {
  if (!input || !text) return text ? text.length : 0;
  const available = getAvailableWidth(input);
  const fullWidth = measureTextWidth(input, text);
  if (fullWidth <= available) return text.length;

  // Binary search for the max length that fits
  let lo = 0, hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measureTextWidth(input, text.slice(0, mid)) <= available) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  return lo;
}

export default function LinkedInputs({ values, onChange, label, rows }) {
  const inputRefs = useRef([]);
  const wrapperRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const setRef = useCallback((el, i) => {
    inputRefs.current[i] = el;
  }, []);

  // Select all text in all inputs visually
  const selectAll = useCallback(() => {
    inputRefs.current.forEach((input) => {
      if (input) {
        input.select();
      }
    });
    setAllSelected(true);
  }, []);

  // Clear the all-selected state when user types or clicks
  const clearAllSelected = useCallback(() => {
    if (allSelected) setAllSelected(false);
  }, [allSelected]);

  const handleChange = useCallback((index, newValue) => {
    // If all was selected, clear everything and start fresh in the first input
    if (allSelected) {
      for (let j = 0; j < values.length; j++) {
        if (j === 0) onChange[j](newValue);
        else onChange[j]('');
      }
      setAllSelected(false);
      setTimeout(() => {
        const firstInput = inputRefs.current[0];
        if (firstInput) {
          firstInput.focus();
          firstInput.setSelectionRange(newValue.length, newValue.length);
        }
      }, 0);
      return;
    }

    const input = inputRefs.current[index];
    const fitLen = findFitLength(input, newValue);

    if (fitLen < newValue.length && index < values.length - 1) {
      const keep = newValue.slice(0, fitLen);
      let overflow = newValue.slice(fitLen);

      onChange[index](keep);

      // Cascade overflow through all subsequent fields
      const cursorField = index + 1;
      const cursorPos = overflow.length;

      for (let i = index + 1; i < values.length; i++) {
        const combined = overflow + values[i];
        const nextInput = inputRefs.current[i];
        const nextFitLen = findFitLength(nextInput, combined);

        if (nextFitLen >= combined.length || i === values.length - 1) {
          // Everything fits in this field (or it's the last field)
          onChange[i](combined);
          overflow = '';
          break;
        } else {
          // This field also overflows — keep what fits, continue cascading
          onChange[i](combined.slice(0, nextFitLen));
          overflow = combined.slice(nextFitLen);
        }
      }

      setTimeout(() => {
        const nextInput = inputRefs.current[cursorField];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(cursorPos, cursorPos);
        }
      }, 0);
    } else {
      onChange[index](newValue);
    }
  }, [values, onChange, allSelected]);

  const handleKeyDown = useCallback((index, e) => {
    const input = inputRefs.current[index];

    // Ctrl+A / Cmd+A → select all across all inputs
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault();
      selectAll();
      return;
    }

    // Delete or Backspace when all selected → clear all
    if (allSelected && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      for (let j = 0; j < values.length; j++) {
        onChange[j]('');
      }
      setAllSelected(false);
      setTimeout(() => {
        const firstInput = inputRefs.current[0];
        if (firstInput) {
          firstInput.focus();
          firstInput.setSelectionRange(0, 0);
        }
      }, 0);
      return;
    }

    // Any other key clears the all-selected state
    clearAllSelected();

    if (e.key === 'Backspace' && index > 0 && input.selectionStart === 0 && input.selectionEnd === 0) {
      e.preventDefault();
      const prevVal = values[index - 1];
      const curVal = values[index];
      const prevInput = inputRefs.current[index - 1];

      // Find how many chars from curVal can fit in prev input
      const combined = prevVal + curVal;
      const fitLen = findFitLength(prevInput, combined);
      const canFitMore = fitLen > prevVal.length;

      if (canFitMore && curVal.length > 0) {
        const moveBack = curVal.slice(0, fitLen - prevVal.length);
        const remain = curVal.slice(fitLen - prevVal.length);
        onChange[index - 1](prevVal + moveBack);
        onChange[index](remain);
        setTimeout(() => {
          if (prevInput) {
            prevInput.focus();
            prevInput.setSelectionRange(prevVal.length + moveBack.length, prevVal.length + moveBack.length);
          }
        }, 0);
      } else if (curVal.length === 0) {
        if (prevVal.length > 0) {
          onChange[index - 1](prevVal.slice(0, -1));
        }
        setTimeout(() => {
          const prevInput = inputRefs.current[index - 1];
          if (prevInput) {
            prevInput.focus();
            const pos = Math.max(0, prevVal.length - 1);
            prevInput.setSelectionRange(pos, pos);
          }
        }, 0);
      }
    }

    // Arrow right at end → move to next input start
    if (e.key === 'ArrowRight' && index < values.length - 1 &&
        input.selectionStart === values[index].length) {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(0, 0);
      }
    }

    // Arrow left at start → move to previous input end
    if (e.key === 'ArrowLeft' && index > 0 && input.selectionStart === 0) {
      e.preventDefault();
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
        const len = values[index - 1].length;
        prevInput.setSelectionRange(len, len);
      }
    }
  }, [values, onChange, allSelected, selectAll, clearAllSelected]);

  // Focus the correct input: end of last non-empty, or first if all empty
  const focusCorrectInput = useCallback(() => {
    for (let i = values.length - 1; i >= 0; i--) {
      if (values[i].length > 0) {
        const input = inputRefs.current[i];
        if (input) {
          input.focus();
          input.setSelectionRange(values[i].length, values[i].length);
        }
        return;
      }
    }
    const first = inputRefs.current[0];
    if (first) {
      first.focus();
      first.setSelectionRange(0, 0);
    }
  }, [values]);

  // Click on the wrapper → redirect focus to correct input
  const handleWrapperClick = useCallback((e) => {
    // Don't interfere if click is inside leftExtra or rightContent areas
    if (e.target.closest('.linked-right') || e.target.closest('.linked-extra')) return;

    // Check if user clicked on a linked input that already has content
    if (e.target.classList.contains('linked-input')) {
      const clickedIndex = inputRefs.current.indexOf(e.target);
      if (clickedIndex >= 0 && values[clickedIndex].length > 0) {
        // Allow normal click on inputs that have content
        return;
      }
    }

    e.preventDefault();
    focusCorrectInput();
  }, [values, focusCorrectInput]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback((e) => {
    // Only blur if focus leaves the entire wrapper
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
      setAllSelected(false);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`linked-inputs ${isFocused ? 'linked-focused' : ''} ${allSelected ? 'linked-all-selected' : ''}`}
      onClick={handleWrapperClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {rows.map((row, i) => (
        <div className="pdf-row" key={i}>
          {row.halfWidth ? (
            <>
              <div className={row.rightContent ? 'linked-left' : 'linked-full'} style={{ gap: '16px' }}>
                <label className="pdf-field" style={{ flex: 1 }}>
                  <input
                    className="linked-input"
                    type="text"
                    ref={(el) => setRef(el, i)}
                    value={values[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                </label>
                <label className="pdf-field linked-extra" style={{ flex: 1 }}>
                  {row.leftExtra}
                </label>
              </div>
              {row.rightContent && (
                <div className="linked-right">
                  {row.rightContent}
                </div>
              )}
            </>
          ) : (
            <>
              <div className={row.rightContent ? 'linked-left' : 'linked-full'}>
                <label className="pdf-field" style={{ flex: 1 }}>
                  {i === 0 && <span className="pdf-label">{label}</span>}
                  <input
                    className="linked-input"
                    type="text"
                    ref={(el) => setRef(el, i)}
                    value={values[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                </label>
              </div>
              {row.rightContent && (
                <div className="linked-right">
                  {row.rightContent}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
