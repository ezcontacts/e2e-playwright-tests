set +e

DESKTOP_STATUS=0
MOBILE_STATUS=0

echo "Running Desktop tests"
ENV_PLATFORM=desktop \
npx playwright test --project=desktop --grep-invert @mobileOnly || DESKTOP_STATUS=$?

echo "Running Mobile tests"
ENV_PLATFORM=mobile \
npx playwright test --project=mobile --grep-invert @desktopOnly || MOBILE_STATUS=$?

echo "Desktop exit code: $DESKTOP_STATUS"
echo "Mobile exit code: $MOBILE_STATUS"

if [ "$DESKTOP_STATUS" -ne 0 ] || [ "$MOBILE_STATUS" -ne 0 ]; then
  exit 1
fi

exit 0