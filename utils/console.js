/* eslint-disable no-console */
export const getWilly = text => {
  console.clear();
  const message = `
                            ${text}   
                 _.--.
                /   . \`\`*
                \\__)   _/
                  | --'
                  /   |
                ,'     \\
              ,'       |
             / ___\\  |/
            | '   \\| ||
          __|  ,' /| ||
        ,\`__. < _)))_)))
       (,'
`;
  console.table(message);
};
