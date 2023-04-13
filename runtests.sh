#!/bin/bash
      
environment=$(echo $1 | tr '[:upper:]' '[:lower:]')
scope=$(echo $2 | tr '[:upper:]' '[:lower:]')
uk=$(echo $3 | tr '[:upper:]' '[:lower:]')
de=$(echo $4 | tr '[:upper:]' '[:lower:]')
runOptions=();
npmRun=\"npm:run-*\";
npmScope="";

if [ ${scope} = "smoke_test" ] ;
then
    npmScope=("--grep \"%40smoke\"")
fi

if [ ${uk} = "true" ]; then
    runOptions+=(\"npm:run-uk\")
fi

if [ ${de} = "true" ]; then
    runOptions+=(\"npm:run-de\")
fi

if [ ! -z "$runOptions" ]; then
    npmRun="$( IFS=$' '; echo "${runOptions[*]}" )"
fi

rm -rf ./pwcache && PWTEST_CACHE_DIR=./pwcache
rm -rf playwright-report
npx playwright install-deps
npm install /tmp/tests --force

export environment_name="${environment}"
export scenarios="${scope}"
export runCountries="${npmRun}"
export scope="${npmScope}"

echo "Triggering Automatron on :'${environment_name}' environment using '${runCountries}' parameters, scope is '${npmScope}'"

npm run execute-all
